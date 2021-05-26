var dReff=firebase.database().ref("GenCustomer")

var dRefPkg=firebase.database().ref("Package")

var packagedata=[]

    dRefPkg.on("child_added",function(getpackagedata){
    var abc=getpackagedata.val()
    packagedata.push(abc)
    fillpackage()
    
})

var dataToFillTable=[]
//console.log(dRefPkg)
console.log('yes')
    //dReff.orderByChild('Status').equalTo(1).on("child_added",function(getpackagedata){
    dReff.on("child_added",function(getpackagedata){
        console.log('yes')
        console.log(getpackagedata.val())
        var abc=getpackagedata.val()
        console.log(abc)
        dataToFillTable=[]
        dataToFillTable.push(abc)
        fillTable()
    })

function fillTable(){
     
    var tabda =document.getElementById('tblPkg')


    for(i=0; i<dataToFillTable.length; i++){
        if(dataToFillTable[i]['Status']=="1"){
        var tr=document.createElement("tr")
        
        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["key"]
        tr.appendChild(td)
        
        var td = document.createElement("td")
        td.innerHTML=dataToFillTable[i]["CustomerName"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Cellno"]
        tr.appendChild(td)
        tabda.appendChild(tr)

        var td=document.createElement("td")
        var btnEdit=document.createElement("button")
        var bText="Edit"
        btnEdit.innerText=bText
        btnEdit.setAttribute("onclick","funcEdit(this)")
        btnEdit.setAttribute("id",dataToFillTable[i]["key"])
        td.appendChild(btnEdit)
        tr.appendChild(td)
        tabda.appendChild(tr)

        var td=document.createElement("td")
        var btnDelete=document.createElement("button")
        var bText="Delete"
        btnDelete.innerText=bText
        btnDelete.setAttribute("onclick","funcdelete(this)")
        btnDelete.setAttribute("id",dataToFillTable[i]["key"])
        td.appendChild(btnDelete)
        tr.appendChild(td)
        tabda.appendChild(tr)
    }
    }
    
}
function funCancel(){
        document.getElementById('btnSubmit').innerText="Submit"
        document.getElementById('btnCancel').setAttribute('style','visibility:hidden;')

        document.getElementById("txtcn").value=""
        document.getElementById("txtcnic").value=""
        document.getElementById("txtcellno").value=""
        document.getElementById("txtadd").value=""
        document.getElementById("txtjd").value=""
        document.getElementById('lblKey').innerText=""
}
function funcEdit(e){
    console.log(e.id)
    dReff.child(e.id).once("value",pkgDetail =>{
         document.getElementById('btnSubmit').innerText="Update"
         document.getElementById('btnCancel').setAttribute('style','visibility:visible;')
         document.getElementById('lblKeyLabel').setAttribute('style','visibility:visible;')
         document.getElementById('lblKey').innerText=pkgDetail.val().key
         document.getElementById("txtcn").value=pkgDetail.val().CustomerName
         document.getElementById("txtcellno").value=pkgDetail.val().Cellno
         document.getElementById("txtcnic").value=pkgDetail.val().CNIC
         document.getElementById("txtadd").value=pkgDetail.val().Address
         document.getElementById("txtjd").value=pkgDetail.val().Joiningdate
    })
    }

function funcdelete(d){
    //dReff.child(d.id).remove()
    
}

function fillpackage(){
    var ddl=document.getElementById("chkpkg")
    var opt=[]
    for(i=0;i<packagedata.length;i++){
        opt.push("<option value=" + packagedata[i]["Key"] + ">" + packagedata[i]["Packages"] + "</option>")
    }
    ddl.innerHTML=opt
}

function Cf(name,cnic,cellno,address,joiningdate,packages,key,pkgKey){
    this.CustomerName=name
    this.CNIC=cnic
    this.Cellno=cellno
    this.Address=address
    this.Joiningdate=joiningdate
    this.PackgeKey=pkgKey
    this.Packages=packages
    this.key=key
}

function customerbook(){
   var key
   key=dReff.push().key

   if(document.getElementById('lblKey').innerText==""){

   }
   else{
       key=document.getElementById('lblKey').innerText
   }

    var name=document.getElementById("txtcn").value
    var cnic=document.getElementById("txtcnic").value
    var cellno=document.getElementById("txtcellno").value
    var address=document.getElementById("txtadd").value
    var joiningdate=document.getElementById("txtjd").value

    var ddl=document.getElementById("chkpkg")
    var pkgKey=ddl.options[ddl.selectedIndex].value

    var packages=ddl.options[ddl.selectedIndex].text

    var objcf=new Cf(name,cnic,cellno,address,joiningdate,packages,key,pkgKey)
    dReff.child(key).set(objcf)
    console.log(objcf)

    document.getElementById("txtcn").value=" "
    document.getElementById("txtcnic").value=" "
    document.getElementById("txtcellno").value=" "
    document.getElementById("txtadd").value=" "
    document.getElementById("txtjd").value=" "

}
