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

        <?php include 'sxn/new-org-header/sxn-new-org-header.php'; ?>
        <?php include 'sxn/add-image/sxn-add-image.php'; ?>
        <?php include 'sxn/add-org-name/sxn-add-org-name.php'; ?>
        <?php include 'sxn/add-org-description/sxn-add-org-description.php'; ?>
        <?php include 'sxn/add-tags/sxn-add-tags.php'; ?>
        <?php include 'sxn/designate-admins/sxn-designate-admins.php'; ?>

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

        <?php include 'sxn/new-org-header/sxn-new-org-header.php'; ?>
        <?php include 'sxn/add-image/sxn-add-image.php'; ?>
        <?php include 'sxn/add-org-name/sxn-add-org-name.php'; ?>
        <?php include 'sxn/add-org-description/sxn-add-org-description.php'; ?>
        <?php include 'sxn/add-tags/sxn-add-tags.php'; ?>
        <?php include 'sxn/designate-admins/sxn-designate-admins.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
