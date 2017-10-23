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

        <?php include 'sxn/profile-header/sxn-profile-header.php'; ?>
        <?php include 'sxn/profile-top-admin-view/sxn-profile-top-admin-view.php'; ?>
        <?php include 'sxn/bio/sxn-bio.php'; ?>
        <?php include 'sxn/titles/sxn-titles.php'; ?>
        <?php include 'sxn/recent-activity/sxn-recent-activity.php'; ?>

    </div>

</div>

<div class="col-tog double-col" hidden>

    <div class="side-col">
        <div class="side-col-scroll">

            <?php include 'side-sxn/scroll-title-home/sxn-scroll-title-home.php'; ?>

        </div>
    </div>

    <div class="app double">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>

        <?php include 'sxn/profile-header/sxn-profile-header.php'; ?>
        <?php include 'sxn/profile-top-admin-view/sxn-profile-top-admin-view.php'; ?>
        <?php include 'sxn/bio/sxn-bio.php'; ?>
        <?php include 'sxn/titles/sxn-titles.php'; ?>
        <?php include 'sxn/recent-activity/sxn-recent-activity.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
