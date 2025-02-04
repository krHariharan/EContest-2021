window.onload = () => {
	disableBack();
	showSnackbar();
	var disp = document.querySelector('#timer');
	var time = document.querySelector('#remTime');
	if(typeof(Storage) !== "undefined") {
		if(!localStorage.getItem("remtime")) {
			localStorage.setItem("remtime",time.value);
		}
	    var rt = Number(localStorage.getItem("remtime"));
	    disp.innerHTML = timeformat(rt);
	    time.value = rt;
		var x = setInterval(function() {
			if (rt >  0) {
				rt = rt - 1;
				localStorage.remtime = String(rt);
				time.value = rt;
				disp.innerHTML = timeformat(rt);
			}
			else if (rt <= 0) {
				localStorage.removeItem("remtime");
				document.querySelector('#complete_test').submit();
				clearInterval(x);
			}
		},1000);
	}
};

function timeformat(ts) {
	let tmp = ts;
	let sec = (~~tmp) % 60;
	tmp = ~~(tmp / 60);
	let min = (~~tmp) % 60;
	tmp = ~~(tmp / 60);
	let hr = (~~tmp) % 60; 
	return pad(hr) + ' :: ' + pad(min) + ' :: ' + pad(sec);
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function disableBack() { window.history.forward() }

window.onpageshow = function(evt) { if (evt.persisted) disableBack() };

function main_page_content() {

	var val = document.querySelector('#question-select').value;
	var box1 = document.querySelector('#question-box');
	var box2 = document.querySelector('#code-editor');
	var l1 = document.querySelector('#quick-link-left');
	var fr = document.querySelector('#frame1');

	if (val == '--') {
		fr.src = "";
		box1.style.display = 'none';
		box2.style.display = 'none';
		l1.style.display = 'none';
	}
	else if (val == 'INS') {
		fr.src = "";
		box1.style.display = 'block';
		box2.style.display = 'none';
		l1.style.display = 'none';
	}
	else {
		box1.style.display = 'block';
		box2.style.display = 'block';
		l1.style.display = 'block';
		if (val == 'QN1') {
			fr.src = "../static/qns/qn1.txt";
		}
		else if (val == 'QN2') {
			fr.src = "../static/qns/qn2.txt";
		}
		else if (val == 'QN3') {
			fr.src = "../static/qns/qn3.txt";
		}
		else if (val == 'QN4') {
			fr.src = "../static/qns/qn4.txt";
		}
		else if (val == 'QN5') {
			fr.src = "../static/qns/qn5.txt";
		}
	}

}

function confirmSubmit (e) {
	if(!confirm('Are you sure?')) e.preventDefault();
	else localStorage.removeItem("remtime");
}

function showSnackbar() {
    var x = document.getElementById("snackbar");
    if (x) {
    	if(x.innerHTML.trim()) {
		    x.className = "show";
		    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		}
	}
}