var dRefPkg=firebase.database().ref("Package")


function Cusfo(pkg,mchg,key,status){
    this.Packages=pkg
    this.MontlyCharges=mchg
    this.Key=key
    this.Status=status
}

var dataToFillTable=[]
dRefPkg.orderByChild('Status').equalTo(0).on('child_added',function(getData){
     var abc =getData.val()

     dataToFillTable=[]
     dataToFillTable.push(abc)

     fillTable()
})


function fillTable(){
     
    var tabda =document.getElementById('tblPkg')


    for(i=0; i<dataToFillTable.length; i++){
        var tr=document.createElement("tr")
        
        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]['Key']
        tr.appendChild(td)
        
        var td = document.createElement('td')
        td.innerHTML=dataToFillTable[i]['Packages']
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]['MontlyCharges']
        tr.appendChild(td)
        tabda.appendChild(tr)

        var td=document.createElement("td")
        var btnEdit=document.createElement("button")
        var bText="Edit"
        btnEdit.innerText=bText
        btnEdit.setAttribute("onclick","funcEdit(this)")
        btnEdit.setAttribute("id",dataToFillTable[i]["Key"])
        td.appendChild(btnEdit)
        tr.appendChild(td)
        tabda.appendChild(tr)

        var td=document.createElement("td")
        var btnDelete=document.createElement("button")
        var bText="Delete"
        btnDelete.innerText=bText
        btnDelete.setAttribute("onclick","funcdelete(this)")
        btnDelete.setAttribute("id",dataToFillTable[i]["Key"])
        td.appendChild(btnDelete)
        tr.appendChild(td)
        tabda.appendChild(tr)
    }

    
}
function funcCancel(){
    document.getElementById('btnSubmit').innerText="Submit"
    document.getElementById('btnCancel').setAttribute('style','visibility:hidden;')
    document.getElementById("txtpkg").value=" "
    document.getElementById("txtchg").value=" "
    document.getElementById("labelKey").innerText=""
}


function funcEdit(e){
    console.log(e.id)
    dRefPkg.child(e.id).once("value",pkgDetail =>{
        console.log(pkgDetail.val())
        document.getElementById("btnSubmit").innerText="Update"
        document.getElementById("btnCancel").setAttribute('style','visibility:visible;')
        document.getElementById("lblKeyLabel").setAttribute('style','visibility:visible;')
        document.getElementById("labelKey").innerText=pkgDetail.val().Key
        document.getElementById("txtpkg").value=pkgDetail.val().Packages
        document.getElementById("txtchg").value=pkgDetail.val().MontlyCharges
    })
}

var boolDelete=false
function funcdelete(d){
   // dRefPkg.child(d.id).remove()
   console.log(d)
    funcEdit(d)
    boolDelete=true
   conform()
}

function validate(pack,monthly){
    var validate= true

    console.log(pack,monthly)
    if(pack==""){
        validate = false
    }

    if(monthly==""){
        validate =false
    }
    return validate
}
function conform(){
    
    var key=dRefPkg.push().key
    var status=0   
    if(document.getElementById('labelKey').innerText==""){

    }
    else{
        key=document.getElementById('labelKey').innerText
        if(boolDelete){
            status=1
            boolDelete=false
        }
    }
    var pack=document.getElementById("txtpkg").value
    var charg=document.getElementById("txtchg").value

    
    
    if(validate(pack,charg)){

    }
    else{
        alert("Fill all fields")
        return
    }

    var objcufo=new Cusfo(pack,charg,key,status)
    dRefPkg.child(key).set(objcufo)
    console.log(objcufo)


    document.getElementById("txtpkg").value=" "
    document.getElementById("txtchg").value=" "
    document.getElementById('btnSubmit').innerText="Submit"
   
    document.getElementById('btnCancel').setAttribute('style','visibility:hidden;')
    document.getElementById("txtpkg").value=" "
    document.getElementById("txtchg").value=" "
    document.getElementById("labelKey").innerText=""    
       
}
