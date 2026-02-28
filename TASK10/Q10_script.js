/* ============================
   Custom jQuery Tab Plugin
============================ */
(function ($) {
    $.fn.customTabs = function (options) {
        const settings = $.extend(
            {
                activeClass: "active-tab",
                animationSpeed: 300,
                defaultTab: 0,
            },
            options,
        );

        return this.each(function () {
            const container = $(this);
            const tabs = container.find(".tab-links li");
            const contents = container.find(".tab-content");

            function activateTab(index, updateHash = true) {
                tabs.removeClass(settings.activeClass);
                contents.stop(true, true).fadeOut(settings.animationSpeed);

                const activeTab = tabs.eq(index);
                const tabId = activeTab.data("tab");

                activeTab.addClass(settings.activeClass);
                $("#" + tabId).fadeIn(settings.animationSpeed);

                if (updateHash) {
                    window.location.hash = tabId;
                }

                activeTab.focus();
            }

            // Click Event
            tabs.on("click", function () {
                const index = $(this).index();
                activateTab(index);
            });

            // Keyboard Navigation
            tabs.on("keydown", function (e) {
                let index = $(this).index();

                if (e.key === "ArrowRight") {
                    index = (index + 1) % tabs.length;
                    activateTab(index);
                }

                if (e.key === "ArrowLeft") {
                    index = (index - 1 + tabs.length) % tabs.length;
                    activateTab(index);
                }
            });

            // Load from URL Hash
            const hash = window.location.hash.substring(1);
            if (hash) {
                const hashIndex = tabs.filter("[data-tab='" + hash + "']").index();
                if (hashIndex !== -1) {
                    activateTab(hashIndex, false);
                } else {
                    activateTab(settings.defaultTab);
                }
            } else {
                activateTab(settings.defaultTab);
            }
        });
    };
})(jQuery);

/* ============================
   Initialize Plugin
============================ */
$(document).ready(function () {
    $("#myTabs").customTabs({
        activeClass: "active-tab",
        animationSpeed: 500,
        defaultTab: 0,
    });
});
