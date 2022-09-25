import { generateRandomName } from "./utility.js";

let vid = document.getElementById("video");
navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: false,
	})
	.then((stream) => {
		vid.srcObject = stream;
		return vid.play();
	})
	.then(() => {
		let btnSave = document.querySelector(".btn__capture");
		btnSave.disabled = false;
		btnSave.addEventListener("click", () => {
			if (confirm("Do you want to download this file?")) {
				takeSnapshot().then(download);
			} else {
				alert("Snap not saved");
			}
		});

		let btnCopyToClip = document.querySelector(".btn__clipboard");
		btnCopyToClip.disabled = false;
		btnCopyToClip.addEventListener("click", () => {
			takeSnapshot().then(copyImgToClip);
		});
	});

function takeSnapshot() {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	canvas.width = vid.videoWidth;
	canvas.height = vid.videoHeight;

	ctx.drawImage(vid, 0, 0);

	return new Promise((res, rej) => {
		canvas.toBlob(res);
	});
}

function download(blob) {
	let a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = `${generateRandomName(10)}.jpg`;
	document.body.appendChild(a);
	a.click();
}

function copyImgToClip(blob) {
	navigator.clipboard
		.write([
			new ClipboardItem({
				[blob.type]: blob,
			}),
		])
		.then(() => {
			console.log("Copied");
		});
}
