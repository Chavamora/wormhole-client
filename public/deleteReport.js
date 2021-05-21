var reporteID = document.querySelector('#reporteID').textContent
var secret_token = Cookies.get('secret_token')


 function deleteReport(report_id) {

    fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token='+secret_token+'&reporteID='+report_id, {
         method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => window.location.href=data.redirect)
    .catch(err => console.log(err))
 }
