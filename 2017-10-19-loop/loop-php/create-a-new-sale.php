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

        <?php include 'sxn/board-header/sxn-board-header.php'; ?>
        <?php include 'sxn/sale-board-notifications-create/sxn-sale-board-notifications-create.php'; ?>
        <?php include 'sxn/filter-content/sxn-filter-content.php'; ?>

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

        <?php include 'sxn/board-header/sxn-board-header.php'; ?>
        <?php include 'sxn/sale-board-notifications-create/sxn-sale-board-notifications-create.php'; ?>
        <?php include 'sxn/filter-content/sxn-filter-content.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
