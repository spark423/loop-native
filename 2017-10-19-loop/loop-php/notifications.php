<?php
 $title = 'Loop';
 $description = '';
 $canonical = '';
 $keywords = '';
 $page_css = '';
 include 'sxn/hdr/sxn-hdr.php';​
?>
<?php include 'sxn/sidenav/sxn-sidenav.php'; ?>

<div class="col-tog single-col">

    <div class="app">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>

        <?php include 'sxn/notifications-header/sxn-notifications-header.php'; ?>
        <?php include 'sxn/notifications-filter/sxn-notifications-filter.php'; ?>
        <?php include 'sxn/notifications/sxn-notifications.php'; ?>

    </div>

</div>

<div class="col-tog double-col" hidden>

    <div class="side-col">
        <div class="side-col-scroll">

            <?php include 'side-sxn/profile-details/sxn-profile-details.php'; ?>
            <?php include 'side-sxn/profile-image/sxn-profile-image.php'; ?>
            <?php include 'side-sxn/divider/sxn-divider.php'; ?>
            <?php include 'side-sxn/text/sxn-text.php'; ?>
            <?php include 'side-sxn/board-name/sxn-board-name.php'; ?>
            <?php include 'side-sxn/text/sxn-text.php'; ?>
            <?php include 'side-sxn/feed/sxn-feed.php'; ?>

        </div>
    </div>

    <div class="app double">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>

        <?php include 'sxn/notifications-header/sxn-notifications-header.php'; ?>
        <?php include 'sxn/notifications-filter/sxn-notifications-filter.php'; ?>
        <?php include 'sxn/notifications/sxn-notifications.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
