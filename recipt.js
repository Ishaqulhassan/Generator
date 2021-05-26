var dReffRpt=firebase.database().ref("Recipt")

var dReff=firebase.database().ref("GenCustomer")

var dRefPkg=firebase.database().ref("Package")

var allReceipt=[]

dReffRpt.on('child_added',function(getData){
       var abc=getData.val()
       allReceipt.push(abc)
})


function funcSearch(){
    console.log(allReceipt)
    let regex = new RegExp(document.getElementById('txtSearch').value, 'i'); 	
    //console.log(regex)
    // Tests for a match.
    //let filtered = allReceipt['CustomerName'].filter(item => regex.test(item));
    //console.log(filtered)
    dataToFillTable=filterByValue(allReceipt,document.getElementById('txtSearch').value)
    console.log(dataToFillTable)
   fillTableonSearch()
}

function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}

//const arrayOfObject = [{ name: 'Paul', country: 'Canada', }, { name: 'Lea', country: 'Italy', }, { name: 'John', country: 'Italy' }];

//console.log(filterByValue(arrayOfObject, 'lea')); // [{name: 'Lea', country: 'Italy'}]
///console.log(filterByValue(arrayOfObject, 'ita')); // [{name: 'Lea', country: 'Italy'}, {name: 'John', country: 'Italy'}]

function Recpt(key,cuskey,cusname,month,pkgkey,package,amount,billmonth){
    this.CustomerKey=cuskey
    this.CustomerName=cusname
    this.Month=month
    this.packageKey=pkgkey
    this.Package=package
    this.Amount=amount
    this.BillMonth=billmonth
    this.Key=key
}

var customerdata=[]

    dReff.on("child_added",function(getcustomerdata){
    var abc=getcustomerdata.val()
    customerdata.push(abc)
    fillcustomer()
})

var packagedata=[]
    dRefPkg.on("child_added",function(getpackagedata){
    var abc=getpackagedata.val()
    packagedata.push(abc)
    fillpackage()
})


function fillcustomer(){
    var cus=document.getElementById("selcust")
    var opt=[]
    for(i=0;i<customerdata.length;i++){
        opt.push("<option value=" + customerdata[i]["key"] + ">" + customerdata[i]["CustomerName"] + "</option>")
    }
    cus.innerHTML=opt

}

function fillpackage(){
    var pkg=document.getElementById("selpkg")
    console.log(packagedata)
    var opt=[]
    for(i=0;i<packagedata.length;i++){
        opt.push("<option value=" + packagedata[i]["Key"] + ">" + packagedata[i]["Packages"] + "</option>")
    }   
    pkg.innerHTML=opt
}


function funcFillAmount(){

    //var selpkg=document.getElementById('selpkg')
    //console.log(selpkg)
    //var pkgKey=selpkg.options[selpkg.selectedIndex].value
     console.log(pkgKey)
    dRefPkg.child(pkgKey).once('value',function(getData){
       // console.log('yes error is here')
        //console.log(getData.val())
        var txtamo=document.getElementById('txtamo').value = getData.val().MontlyCharges
    })
}

var pkgKey=""
function funcFillCustomerData(){
    var key
    var cus=document.getElementById("selcust")
    key=cus.options[cus.selectedIndex].value

    dReff.child(key).once('value',function(gtData){
        var abc=gtData.val()
        console.log(abc)
        var txtcnic=document.getElementById('txtcnic')
        txtcnic.value=abc['CNIC']

        var txtcellno=document.getElementById("txtcellno")
        txtcellno.value=abc["Cellno"]

        var selpkg=document.getElementById('selpkg')
        selpkg.options[selpkg.selectedIndex].text=abc['Packages']
        pkgKey=abc["packgeKey"]
        console.log(pkgKey)
        //selpkg.options[selpkg.selectedIndex].value=abc["packgeKey"]
        //console.log('whats')
        //console.log(selpkg.options[selpkg.selectedIndex].value)
        funcFillAmount()
        
       // var chkpkg=document.getElementById("chkpkg")
       // chkpkg.value=abc["Packages"]

       // var txtamo=document.getElementById("txtamo")
       // txtamo.value=abc["Amount"] 

    })

    fillCustomerRcpt()
}

function funcrecvd(){

    var selcust=document.getElementById("selcust")

    var rptcus=selcust.options[selcust.selectedIndex].text//document.getElementById("selcust").value
    var cKey=selcust.options[selcust.selectedIndex].value

    var rptmonth=document.getElementById("txtrd").value
    //var selPkg=document.getElementById('selpkg')
    var selpkg=document.getElementById('selpkg')
        
    var rptpkg=selpkg.options[selpkg.selectedIndex].text//document.getElementById("selpkg").value
    pKey=pkgKey
    var rptamo=document.getElementById("txtamo").value

    var bMonth=document.getElementById('txtbm').value
   var key=dReffRpt.push().key
    var objrpt=new Recpt(key,cKey,rptcus,rptmonth,pKey,rptpkg,rptamo,bMonth)
    console.log(objrpt)
    dReffRpt.child(key).set(objrpt)
    
    
}

var rcptList=[]
function fillCustomerRcpt(){
        
    dReffRpt.once('value',function(getData){
    var obj=getData.val()
    //var arr_obj = Object.keys(obj).map(key => ({ [key]: obj[key] }));
    rcptList=[]
     for(key in obj){
         //console.log(obj[key])
         rcptList.push(obj[key])
     }
    //console.log(rcptList)
       //rcptList.push(abc[0])
       //console.log(rcptList)
       fillTable()   
    })
    
    //console.log(rcptList)
}

var dataToFillTable=[]

function fillTableonSearch(){
    console.log(dataToFillTable)
    var tbldata=document.getElementById("rpttbl")
    for(i=0; i<dataToFillTable.length; i++){
        var tr=document.createElement("tr")

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["CustomerName"]
        tr.appendChild(td)
    
        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Package"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Amount"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["BillMonth"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Month"]
        tr.appendChild(td)
        tbldata.appendChild(tr)
        
    }
}

function fillTable(){
    var key
    var cus=document.getElementById("selcust")
    key=cus.options[cus.selectedIndex].value
    dataToFillTable=[]
    for(i=0; i<rcptList.length; i++){
        console.log(key,rcptList[i]['CustomerKey'])
        if(rcptList[i]['CustomerKey']==key){
          dataToFillTable.push(rcptList[i])        
        }
    }

    
    var tbldata=document.getElementById("rpttbl")
    
    $(document).ready(function() {
        console.log('reach')
        //$("rpttbl").find("tr:gt(0)").remove();
        $("rpttbl").remove();
     });

    for(i=0; i<dataToFillTable.length; i++){
        var tr=document.createElement("tr")
        
        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["CustomerName"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Package"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Amount"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["BillMonth"]
        tr.appendChild(td)

        var td=document.createElement("td")
        td.innerHTML=dataToFillTable[i]["Month"]
        tr.appendChild(td)
        tbldata.appendChild(tr)
        
    }

}