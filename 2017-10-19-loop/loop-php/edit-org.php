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

        <?php include 'sxn/edit-organization-header/sxn-edit-organization-header.php'; ?>
        <?php include 'sxn/edit-org-name/sxn-edit-org-name.php'; ?>
        <?php include 'sxn/edit-description/sxn-edit-description.php'; ?>
        <?php include 'sxn/add-edit-tags/sxn-add-edit-tags.php'; ?>
        <?php include 'sxn/add-edit-leaders/sxn-add-edit-leaders.php'; ?>
        <?php include 'sxn/add-edit-members/sxn-add-edit-members.php'; ?>

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

        <?php include 'sxn/edit-organization-header/sxn-edit-organization-header.php'; ?>
        <?php include 'sxn/edit-org-name/sxn-edit-org-name.php'; ?>
        <?php include 'sxn/edit-description/sxn-edit-description.php'; ?>
        <?php include 'sxn/add-edit-tags/sxn-add-edit-tags.php'; ?>
        <?php include 'sxn/add-edit-leaders/sxn-add-edit-leaders.php'; ?>
        <?php include 'sxn/add-edit-members/sxn-add-edit-members.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>
