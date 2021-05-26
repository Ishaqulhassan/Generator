var dRefPkg=firebase.database().ref("Package")

var pkgDetail=[]

dRefPkg.orderByChild('Status').equalTo(0).on('child_added',function(getData){
    var abc =getData.val()
    pkgDetail.push(abc)
    //console.log(pkgDetail)
})


var dcustomer=firebase.database().ref("GenCustomer")

var customertable=[]
dcustomer.orderByChild("Status").equalTo(1).on("child_added",function(getData){
    var abc=getData.val()
    customertable.push(abc)
   // console.log(customertable)
})


function submit(){
    var cal =document.getElementById('txtjd').value 

    for(i=0;i<customertable.length;i++){
        customertable[i]["Month"]=cal

        for(j=0;j<pkgDetail.length;j++){
            console.log(pkgDetail[j]['Key'],customertable[i]['packgeKey'])
           if(pkgDetail[j]['Key']==customertable[i]['packgeKey']){
              customertable[i]['Amount'] =pkgDetail[j]['MontlyCharges']
           }

        }


    }

    console.log(customertable)
}
