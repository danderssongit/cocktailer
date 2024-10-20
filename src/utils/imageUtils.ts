export function getAverageColor(
	image: HTMLImageElement
): Promise<{ r: number; g: number; b: number }> {
	return new Promise((resolve) => {
		if (image.complete) {
			processImage();
		} else {
			image.onload = processImage;
		}

		function processImage() {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");
			canvas.width = image.width;
			canvas.height = image.height;

			if (context) {
				context.drawImage(image, 0, 0);

				const data = context.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				).data;

				let r = 0,
					g = 0,
					b = 0,
					count = 0;

				for (let i = 0; i < data.length; i += 4) {
					r += data[i];
					g += data[i + 1];
					b += data[i + 2];
					count++;
				}

				const result = {
					r: Math.floor(r / count),
					g: Math.floor(g / count),
					b: Math.floor(b / count),
				};

				console.log("Final average color:", result);

				resolve(result);
			} else {
				console.error("Could not get 2D context from canvas");
				resolve({ r: 255, g: 255, b: 255 });
			}
		}
	});
}

export function applyAverageColorToElement(
	image: HTMLImageElement,
	element: HTMLElement
): void {
	getAverageColor(image).then((color) => {
		element.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;
	});
}
