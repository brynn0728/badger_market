document.addEventListener('DOMContentLoaded', function() {
    // Firebase 인증 상태 감지
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // 사용자가 로그인했다면, 위시 리스트 데이터 로드
            loadWishlist(user.uid);
        } else {
            // 사용자가 로그인하지 않았다면, 로그인 페이지로 리다이렉트하거나 메시지 표시
            console.log('User is not signed in.');
        }
    });

    $(document).on('click', '.wish-icon', function() {
        var $icon = $(this); // 클릭된 아이콘
        var productId = $icon.data('id'); // 상품 ID
        var inWishlist = $icon.data('wishlist'); // 위시리스트에 있는지 여부

        if (firebase.auth().currentUser) {
            // 사용자가 로그인한 경우
            var userId = firebase.auth().currentUser.uid; // 사용자 ID
            var wishlistRef = db.collection('users').doc(userId).collection('wishlist').doc(productId);

            if (!inWishlist) {
                // 위시리스트에 추가
                wishlistRef.set({ /* 여기에 상품에 대한 데이터를 추가하세요 */ }).then(() => {
                    $icon.text('♥').data('wishlist', true); // 아이콘 상태 변경
                });
            } else {
                // 위시리스트에서 제거
                wishlistRef.delete().then(() => {
                    $icon.text('♡').data('wishlist', false); // 아이콘 상태 변경
                });
            }
        } else {
            // 사용자가 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
            window.location.href = '/login.html';
        }
    });
});

