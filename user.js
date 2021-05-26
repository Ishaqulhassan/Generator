var dReff=firebase.database().ref("UserName")


function Uf(name,emailaddress,cellno,password,conformpassword,key){
    this.UserName=name
    this.EmailAddress=emailaddress
    this.Cellno=cellno
    this.Password=password
    this.ConformPassword=conformpassword
    this.Key=key
}

function conform(){
    var key=dReff.push().key
    var uname=document.getElementById("txtun").value
    var ucnic=document.getElementById("txtmail").value
    var ucell=document.getElementById("txtcellno").value
    var upass=document.getElementById("txtpass").value
    var ucpass=document.getElementById("txtcpass").value

    var objuf=new Uf(uname,ucnic,ucell,upass,ucpass,key)
    dReff.child(key).set(objuf)
    console.log(objuf)

    document.getElementById("txtun").value=" "
    document.getElementById("txtmail").value=" "
    document.getElementById("txtcellno").value=" "
    document.getElementById("txtpass").value=" "   
    document.getElementById("txtcpass").value=" "
}
function conformCan(){
    document.getElementById("txtun").value=" "
    document.getElementById("txtmail").value=" "
    document.getElementById("txtcellno").value=" "
    document.getElementById("txtpass").value=" "
    document.getElementById("txtcpass").value=" "
}
