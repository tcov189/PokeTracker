//// === Function for testing if browser supports SVGs ==== ////

function supportsSvg() {
  var div = document.createElement('div');
  div.innerHTML = '<svg/>';
  return (div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
}

if (!supportsSvg()) {    
    document.documentElement.className += " no-svg";
}

