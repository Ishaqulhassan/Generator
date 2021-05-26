var dReff=firebase.database().ref("GenCustomer")

var dRefPkg=firebase.database().ref("Package")

var packagedata=[]
    dRefPkg.on("child_added",function(getpackagedata){
    var xyz=getpackagedata.val()
    packagedata.push(xyz)
    fillpackage()
})

function fillpackage(){
    var ddl=document.getElementById("chkpkg")
    var opt=[]
    for(i=0;i<packagedata.length;i++){
        opt.push("<option value=" + packagedata[i]["Key"] + ">" + packagedata[i]["Packages"] + "</option>")
    }
    ddl.innerHTML=opt
}


function Af(name,cnic,cellno,address,packages,key,pkgKey,status){
    this.CustomerName=name
    this.CNIC=cnic
    this.Cellno=cellno
    this.Address=address
    this.Packages=packages
    this.key=key
    this.packgeKey=pkgKey
    this.Status=0
}

function customerapp(){
    var key=dReff.push().key
    var name=document.getElementById("txtafcn").value
    var cnic=document.getElementById("txtafcnic").value
    var cellno=document.getElementById("txtafcellno").value
    var address=document.getElementById("txtafadd").value

    var ddl=document.getElementById("chkpkg")
    var pkgKey=ddl.options[ddl.selectedIndex].value

    var packages=ddl.options[ddl.selectedIndex].text

    var objcaf=new Af(name,cnic,cellno,address,packages,key,pkgKey)
    dReff.child(key).set(objcaf)
    console.log(objcaf)

    document.getElementById("txtafcn").value=" "
    document.getElementById("txtafcnic").value=" "
    document.getElementById("txtafcellno").value=" "
    document.getElementById("txtafadd").value=" "
    
    
}
function customercan(){
    document.getElementById("txtafcn").value=" "
    document.getElementById("txtafcnic").value=" "
    document.getElementById("txtafcellno").value=" "
    document.getElementById("txtafadd").value=" "
}