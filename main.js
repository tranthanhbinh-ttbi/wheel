const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('#spin-btn');

const degreesPerNumber = 36; // 360 độ / 10 ô = 36 độ mỗi ô

// SỬA ĐỔI: Để trúng "34" (là ô thứ 9, index 8)
const targetIndex = 4;
// Văn bản hiển thị kết quả
const winnerText = "32. Tăng Lê Gia Bảo";

const targetAngle = targetIndex * degreesPerNumber;

let spinCount = 0;
let isSpinning = false
const rotationsPerSpin = 8; // Số vòng quay thêm mỗi lần

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;

    isSpinning = true;
    spinCount++; 
    // Tính tổng số độ sẽ quay (cộng dồn các lần quay)
    const totalSpinsInDegrees = (spinCount * rotationsPerSpin) * 360; 

    // Góc quay cuối cùng (trừ đi góc mục tiêu để kim chỉ về đúng)
    const finalRotation = totalSpinsInDegrees - targetAngle;

    wheel.style.transform = `rotate(${finalRotation}deg)`;
});

// SỬA ĐỔI: Thay thế alert bằng hàm hiển thị pop-up
wheel.addEventListener('transitionend', () => {
    isSpinning = false; 
    // Gọi hàm hiển thị pop-up với kết quả
    showWinnerPopup(winnerText);
});


// HÀM MỚI: Dùng để tạo và hiển thị pop-up
function showWinnerPopup(winnerName) {
    // 1. Tạo các phần tử HTML cho pop-up
    
    // Lớp phủ nền mờ
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    // Khung nội dung
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Header (màu xanh, chứa tiêu đề và nút 'x')
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = '<span>Result!</span><button class="modal-close-x">&times;</button>';

    // Body (chứa tên người chiến thắng)
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.textContent = winnerName;

    // Footer (chứa 2 nút 'Close' và 'Remove')
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.innerHTML = '<button class="modal-close-btn">Close</button><button class="modal-remove-btn">Remove</button>';

    // 2. Ghép các phần tử lại với nhau
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalOverlay.appendChild(modalContent);

    // 3. Thêm pop-up vào <body> của trang
    document.body.appendChild(modalOverlay);

    // 4. Hàm để xóa pop-up
    function closeModal() {
        if (document.body.contains(modalOverlay)) {
            document.body.removeChild(modalOverlay);
        }
    }

    // 5. Thêm sự kiện click cho các nút để đóng pop-up
    // Click nút 'x'
    modalContent.querySelector('.modal-close-x').addEventListener('click', closeModal);
    // Click nút 'Close'
    modalContent.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    // Click nút 'Remove' (hiện tại chỉ đóng, bạn có thể thêm logic xóa sau)
    modalContent.querySelector('.modal-remove-btn').addEventListener('click', () => {
        console.log(`Đã xóa: ${winnerName}`); // Thêm logic nếu cần
        closeModal();
    });
}

// Lưu ý: Đã xóa dấu '}' thừa bị lỗi ở cuối file gốc của bạn.