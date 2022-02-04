(function($) {
    "use strict";
    // Toggle the side navigation
        $("body").on("click", "#sidebarToggle", function (e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);
