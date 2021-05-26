var dataToFillTable=[]
var dRefCustomer=firebase.database().ref('GenCustomer')

dRefCustomer.orderByChild('Status').equalTo(0).on("child_added",function(getpackagedata){
    var mno=getpackagedata.val()
    dataToFillTable=[]
    dataToFillTable.push(mno)   
    
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
            var btnJoin=document.createElement("button")
            var bText="Join"
            btnJoin.innerText=bText
            btnJoin.setAttribute("onclick","funjoin(this)")
            btnJoin.setAttribute("id",dataToFillTable[i]["key"])
            td.appendChild(btnJoin)
            tr.appendChild(td)
            tabda.appendChild(tr)
        }
}

function funjoin(j){
    //console.log('fired')
    fillObject(j)
}

var objJoin

function fillObject(j){
    dRefCustomer.child(j.id).once("value",pkgDetail =>{
        objJoin =pkgDetail.val()
        console.log(objJoin)

        objJoin.Status=1
        console.log(objJoin)
        var key=objJoin.key
        dRefCustomer.child(key).set(objJoin)
       
   })
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