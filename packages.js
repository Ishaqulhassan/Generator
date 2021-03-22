var dRefPkg=firebase.database().ref("Package")


function Cusfo(pkg,mchg,key){
    this.Packages=pkg
    this.MontlyCharges=mchg
    this.Key=key
}

var dataToFillTable=[]
dRefPkg.on('child_added',function(getData){
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
        tab.appendChild(tr)

    }

    
}

function funcEdit(e){
    console.log(e.id)
    dRefPkg.child(e.id).once("value",pkgDetail =>{
        //console.log(pkgDetail.val())
         document.getElementById("txtpkg").value=pkgDetail.val().Packages
         document.getElementById("txtchg").value=pkgDetail.val().MontlyCharges
    })
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
    var pack=document.getElementById("txtpkg").value
    var charg=document.getElementById("txtchg").value
    
    if(validate(pack,charg)){

    }
    else{
        alert("Fill all fields")
        return
    }

    var objcufo=new Cusfo(pack,charg,key)
    dRefPkg.child(key).set(objcufo)
    console.log(objcufo)


    var pack=document.getElementById("txtpkg").value=" "
    var charg=document.getElementById("txtchg").value=" "
    


}





