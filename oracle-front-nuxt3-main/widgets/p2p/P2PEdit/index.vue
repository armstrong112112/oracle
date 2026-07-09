<template>
  <div class="p2p-listing-edit">
    <PageHeaderLayout :title="$t('p2p.listing.edit')" v-if="isMobile">
      <template #actions>
        <TrashIcon class="cursor-pointer" @click="handleDeleteListing" />
      </template>
    </PageHeaderLayout>
    <P2PListingCreate noButtons />
    <P2PListingCreateStepTwo noButtons />
    <div class="p2p-listing-create__footer">
      <new-oracle-button
        text="Save"
        class="mt-10"
        @click="handleSave"
        color="yellow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TrashIcon from "~/assets/svg/trash.svg?component";
import PageHeaderLayout from "~/widgets/layout/PageHeader.vue";
import P2PListingCreate from "~/widgets/p2p/P2PListingCreate/index.vue";
import P2PListingCreateStepTwo from "~/widgets/p2p/P2PListingCreateStepTwo/index.vue";

const windowWidth = ref(0);

const isMobile = computed(() => windowWidth.value < 1024);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleDeleteListing = () => {
  console.log("delete listing");
};

const handleSave = () => {
  console.log("save listing");
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss">
.p2p-listing-edit .p2p-listing-create__container {
  padding-bottom: 10px !important;
}
.p2p-listing-edit .p2p-listing-create__footer {
  padding: 0 16px;
  margin: 20px 0;
}
</style>
