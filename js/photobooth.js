const video = document.getElementById('video');
        const canvasMain = document.getElementById('canvasMain');
        const canvasEffect1 = document.getElementById('canvasEffect1');
        const canvasEffect2 = document.getElementById('canvasEffect2');
        const ctxMain = canvasMain.getContext('2d');
        const ctxEffect1 = canvasEffect1.getContext('2d');
        const ctxEffect2 = canvasEffect2.getContext('2d');
        const captureBtn = document.getElementById('capture');
        const deleteBtn = document.getElementById('deletePhoto');
        const downloadBtn = document.getElementById('download');
        const bgUpload = document.getElementById('bgUpload');
        const timerInput = document.getElementById('timer');
        const frameColor = document.getElementById('frameColor');
        const bgColor = document.getElementById('bgColor');
        const stickerUpload = document.getElementById('stickerUpload');

        let uploadedBg = null;
        let uploadedSticker = null;

        // Akses kamera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { video.srcObject = stream; })
            .catch(err => { console.error("Gagal mengakses kamera:", err); });

        let countdown = null;
        let seconds = parseInt(timerInput.value);

        timerInput.addEventListener('change', () => {
            seconds = parseInt(timerInput.value);
        });

        function startTimer() {
            let timeLeft = seconds;
            countdown = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    capturePhoto();
                } else {
                    console.log(`${timeLeft} detik lagi...`);
                    timeLeft--;
                }
            }, 1000);
        }

        // Ambil foto setelah timer
        captureBtn.addEventListener('click', () => {
            startTimer();
        });

        // Ambil foto setelah timer selesai
        function capturePhoto() {
            ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
            ctxEffect1.clearRect(0, 0, canvasEffect1.width, canvasEffect1.height);
            ctxEffect2.clearRect(0, 0, canvasEffect2.width, canvasEffect2.height);

            // Ambil gambar dari video
            ctxMain.drawImage(video, 0, 0, canvasMain.width, canvasMain.height);

            // Terapkan efek pada foto pertama
            ctxEffect1.drawImage(video, 0, 0, canvasEffect1.width, canvasEffect1.height);
            ctxEffect1.filter = 'sepia(1)';
            ctxEffect1.drawImage(video, 0, 0, canvasEffect1.width, canvasEffect1.height);

            // Terapkan efek pada foto kedua
            ctxEffect2.drawImage(video, 0, 0, canvasEffect2.width, canvasEffect2.height);
            ctxEffect2.filter = 'grayscale(1)';
            ctxEffect2.drawImage(video, 0, 0, canvasEffect2.width, canvasEffect2.height);

            // Terapkan background PNG jika diupload
            if (uploadedBg) {
                ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
                ctxEffect1.clearRect(0, 0, canvasEffect1.width, canvasEffect1.height);
                ctxEffect2.clearRect(0, 0, canvasEffect2.width, canvasEffect2.height);
                ctxMain.drawImage(uploadedBg, 0, 0, canvasMain.width, canvasMain.height);
                ctxEffect1.drawImage(uploadedBg, 0, 0, canvasEffect1.width, canvasEffect1.height);
                ctxEffect2.drawImage(uploadedBg, 0, 0, canvasEffect2.width, canvasEffect2.height);
            }

            // Tempatkan stiker jika diupload
            if (uploadedSticker) {
                ctxMain.drawImage(uploadedSticker, 100, 100, 50, 50); // Ubah posisi sesuai kebutuhan
                ctxEffect1.drawImage(uploadedSticker, 100, 100, 50, 50); // Ubah posisi sesuai kebutuhan
                ctxEffect2.drawImage(uploadedSticker, 100, 100, 50, 50); // Ubah posisi sesuai kebutuhan
            }

            // Terapkan warna frame dan background
            canvasMain.style.borderColor = frameColor.value;
            canvasEffect1.style.borderColor = frameColor.value;
            canvasEffect2.style.borderColor = frameColor.value;
            document.body.style.backgroundColor = bgColor.value;
        }

        // Upload background PNG
        bgUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        uploadedBg = img;
                    };
                };
                reader.readAsDataURL(file);
            }
        });

        // Upload stiker
        stickerUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        uploadedSticker = img;
                    };
                };
                reader.readAsDataURL(file);
            }
        });

        // Hapus foto
        deleteBtn.addEventListener('click', () => {
            ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
            ctxEffect1.clearRect(0, 0, canvasEffect1.width, canvasEffect1.height);
            ctxEffect2.clearRect(0, 0, canvasEffect2.width, canvasEffect2.height);
        });

        // Download Foto
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'photo_with_bg.png';
            link.href = canvasMain.toDataURL();
            link.click();
        });