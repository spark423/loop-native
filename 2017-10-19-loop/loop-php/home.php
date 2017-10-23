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
        <?php include 'sxn/greeting/sxn-greeting.php'; ?>
        <?php include 'sxn/overview/sxn-overview.php'; ?>
        <?php include 'sxn/analytics/sxn-analytics.php'; ?>

    </div>

</div>

<div class="col-tog double-col" hidden>

    <div class="side-col">
        <div class="side-col-scroll">

            <?php include 'side-sxn/scroll-title-home/sxn-scroll-title-home.php'; ?>
            <?php include 'side-sxn/board-traffic/sxn-board-traffic.php'; ?>
            <?php include 'side-sxn/stat/sxn-stat.php'; ?>
            <?php include 'side-sxn/text-with-icon/sxn-text-with-icon.php'; ?>

        </div>
    </div>

    <div class="app double">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>
        <?php include 'sxn/greeting/sxn-greeting.php'; ?>
        <?php include 'sxn/overview/sxn-overview.php'; ?>
        <?php include 'sxn/analytics/sxn-analytics.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
