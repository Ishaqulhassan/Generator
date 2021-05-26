var dRefPkg = firebase.database().ref("Package")

var dReffRpt = firebase.database().ref("Recipt")



var packagedata = []
dRefPkg.on("child_added", function (getpackagedata) {
    var abc = getpackagedata.val()
    packagedata.push(abc)
    fillpackage()
})

var allReceipt = []

dReffRpt.on("child_added", function (getData) {
    var abc = getData.val()
    allReceipt.push(abc)
})


function funcsearch() {
    //console.log(allReceipt)
    var chkPkg = document.getElementById('chkPkg')

    var selpkg = document.getElementById('selpkg')
    var pkgId = ''

    if (chkPkg.checked) {
        //console.log('yes')
        pkgId = selpkg.options[selpkg.selectedIndex].value
        //console.log(pkgId)
        dataToFillTable = filterByValue(allReceipt, pkgId)
        console.log(dataToFillTable)
    }

    //let regex = new RegExp(document.getElementById("btnSearch").value, 'i');

    var chkBillMonth = document.getElementById('chkBillMonth')
    var txtBillMonth = document.getElementById('txtBillMonth').value
    console.log(txtBillMonth)
    if (chkBillMonth.checked) {
        // console.log(txtBillMonth)
        //dataToFillTable=[]
        var dt2 = []
        if (dataToFillTable.length == 0) {
            dt2 = allReceipt
        }
        else {
            dt2 = dataToFillTable
        }

        dataToFillTable = []
        dataToFillTable = filterByValue(dt2, txtBillMonth)
        console.log(dataToFillTable)
       
        dt2 = []
        dt2 = dataToFillTable
        dataToFillTable = []
        for (i = 0; i < dt2.length; i++) {
            if (dt2[i]['BillMonth'].slice(0, 7) == txtBillMonth) {
                dataToFillTable.push(dt2[i])
            }
        }
        console.log(dataToFillTable)

    }

    var chkReciptMonth = document.getElementById("chkReciptMonth")
    var txtReciptMonth = document.getElementById("txtReciptMonth").value

    if (chkReciptMonth.checked) {

        console.log('not Run',dataToFillTable.length)
        var dt3 = []

        if (dataToFillTable.length == 0) {
            dt3 = allReceipt
        }
        else {
            dt3 = dataToFillTable
        }

        dataToFillTable = []
        dataToFillTable = filterByValue(dt3, txtReciptMonth)
        dt3 = []
        dt3 = dataToFillTable
        dataToFillTable = []
        for (i = 0; i < dt3.length; i++) {
            if (dt3[i]['Month'].slice(0, 7) == txtReciptMonth) {
                dataToFillTable.push(dt3[i])
            }
        }
    }


    console.log(dataToFillTable)
    fillTableonSearch()
}
function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}



function fillpackage() {
    var pkg = document.getElementById("selpkg")
    console.log(packagedata)
    var opt = []
    for (i = 0; i < packagedata.length; i++) {
        opt.push("<option value=" + packagedata[i]["Key"] + ">" + packagedata[i]["Packages"] + "</option>")
    }
    pkg.innerHTML = opt
}

var dataToFillTable = []

function fillTableonSearch() {
    console.log(dataToFillTable)

    var tbldata = document.getElementById("dReporttbl")
    var noofRows=tbldata.rows.length
    //console.log(noofRows)
   if(noofRows>1){
    for(i=noofRows-1;i>0;i--){
        console.log('In Loop',i)
        tbldata.deleteRow(i)
    }
   }
    for (i = 0; i < dataToFillTable.length; i++) {
        var tr = document.createElement("tr")

        var td = document.createElement("td")
        td.innerHTML = dataToFillTable[i]["CustomerName"]
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = dataToFillTable[i]["Package"]
        tr.appendChild(td)

        

        var td = document.createElement("td")
        td.innerHTML = dataToFillTable[i]["Month"]
        tr.appendChild(td)


        var td = document.createElement("td")
        td.innerHTML = dataToFillTable[i]["BillMonth"]
        tr.appendChild(td)

        tbldata.appendChild(tr)

    }
}