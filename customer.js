var dReff=firebase.database().ref("GenCustomer")

var dRefPkg=firebase.database().ref("Package")

var packagedata=[]

    dRefPkg.on("child_added",function(getpackagedata){
    var abc=getpackagedata.val()
    packagedata.push(abc)
    fillpackage()
    
})

var dataToFillTable=[]

    dReff.on("child_added",function(getpackagedata){
        var abc=getpackagedata.val()
        dataToFillTable=[]
        dataToFillTable.push(abc)
        fillTable()
    })

function fillTable(){
     
    var tabda =document.getElementById('tblPkg')


    for(i=0; i<dataToFillTable.length; i++){
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
        tab.appendChild(tr)

    }

    
}
function funcEdit(e){
    console.log(e.id)
    dReff.child(e.id).once("value",pkgDetail =>{
        //console.log(pkgDetail.val())
         document.getElementById("txtcn").value=pkgDetail.val().CustomerName
         document.getElementById("txtcellno").value=pkgDetail.val().Cellno
         document.getElementById("txtcnic").value=pkgDetail.val().CNIC
         document.getElementById("txtadd").value=pkgDetail.val().Address
         document.getElementById("txtjd").value=pkgDetail.val().Joiningdate
    })
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
    var key=dReff.push().key
    var cname=document.getElementById("txtcn").value
    var ccnic=document.getElementById("txtcnic").value
    var ccell=document.getElementById("txtcellno").value
    var caddress=document.getElementById("txtadd").value
    var cjoindate=document.getElementById("txtjd").value

    var ddl=document.getElementById("chkpkg")
    var pkgKey=ddl.options[ddl.selectedIndex].value

    var pkgName=ddl.options[ddl.selectedIndex].text

    var objcf=new Cf(cname,ccnic,ccell,caddress,cjoindate,pkgName,key,pkgKey)
    dReff.child(key).set(objcf)
    console.log(objcf)

    var cname=document.getElementById("txtcn").value=" "
    var ccnic=document.getElementById("txtcnic").value=" "
    var ccell=document.getElementById("txtcellno").value=" "
    var caddress=document.getElementById("txtadd").value=" "
    var cjoindate=document.getElementById("txtjd").value=" "

}
