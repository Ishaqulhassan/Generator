var dReff=firebase.database().ref("UserName")


function Uf(name,emailaddress,cellno,password,key){
    this.UserName=name
    this.EmailAddress=emailaddress
    this.Cellno=cellno
    this.Password=password
    this.Key=key
}

function conform(){
    var key=dReff.push().key
    var uname=document.getElementById("txtun").value
    var ucnic=document.getElementById("txtmail").value
    var ucell=document.getElementById("txtcellno").value
    var upass=document.getElementById("txtpass").value


    var objuf=new Uf(uname,ucnic,ucell,upass,key)
    dReff.child(key).set(objuf)
    console.log(objuf)

    var uname=document.getElementById("txtun").value=" "
    var ucnic=document.getElementById("txtmail").value=" "
    var ucell=document.getElementById("txtcellno").value=" "
    var upass=document.getElementById("txtpass").value=" "
    
}
