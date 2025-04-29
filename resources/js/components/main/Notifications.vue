<script lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { VList, VListItem, VSpacer, VBtnGroup, VCheckboxBtn, VListItemAction, VContainer, VListItemTitle, VListItemSubtitle  } from 'vuetify/components';
import { Component, Prop, Model, toNative } from 'vue-facing-decorator';
import notificationService from '@/services/notification.js';
import IconButton from '@/components/button/IconButton.vue';
import {WorkingComponent} from '../WorkingComponent.vue';
import { deleteFromArray } from '@/libs/util';

@Component({
	name: "Notifications",
	components: {
		IconButton,
	},
})
class Notifications extends WorkingComponent {
	router = router;
	selected = [];
	notifications = [
		// { data: { url: '#', title: 'Notif', message: 'Desc' }, id: 0, read_at: null },
	]
	created(){
		this.fetchNotifications();
		const intervalId = setInterval(() => {
			if (this.isLoggedIn)
				this.fetchNotifications();
			else
				clearInterval(intervalId);
		}, 30000);
	}
	get notificationCount(){
		return this.notifications.length;
	}
	async fetchNotifications() {
		this.notifications = notificationService.getData(await notificationService.fetch());
	}
	async bulkMarkAsRead(){
		const ids = this.unreadNotifs.map((n) => n.id);
		await this.waitBusy(
			async () => {
				await notificationService.bulk_mark_as_read(ids);
				this.fetchNotifications();
			}
		);
	}
	async bulkDestroy(){
		const ids = this.readNotifs.map((n) => n.id);
		await this.waitBusy(
			async () => {
				await notificationService.bulk_destroy(ids);
				this.fetchNotifications();
			}
		);
	}
	async markAsRead(notif){
		await this.waitBusy(
			async () => {
				await notificationService.mark_as_read(notif, {});
				this.fetchNotifications();
			}
		);
	}
	async destroy(notif){
		await this.waitBusy(
			async () => {
				await notificationService.destroy(notif);
				deleteFromArray(this.notifications, notif);
				this.fetchNotifications();
			}
		);
	}
	get readNotifs(){
		return this.notifications.filter(notif => notif.read_at !== null);
	}
	get unreadNotifs(){
		return this.notifications.filter(notif => notif.read_at == null);
	}
	get hasReadNotif(){
		return this.readNotifs.length;
	}
	get hasUnreadNotif(){
		return this.unreadNotifs.length;
	}
}
export { Notifications }
export default toNative(Notifications);
</script>
<template>
	<VMenu
		bottom
		left
		close-on-click
		offset-y
	>
		<template #activator="{ props }">
			<VBtn 
				icon
				v-bind="props"
			>
				<VBadge
					overlap
					color="green"
					:content="notificationCount"
					:value="notificationCount"
				>
					<VIcon>mdi-bell</VIcon>
				</VBadge>
			</VBtn>
		</template>
		<VCard
			class="mx-auto"
			density="compact"
		>
			<VCardTitle class="d-flex flex-grow-1">
				<VList
					class="d-flex flex-grow-1 flex-column"
					density="compact"
				>
					<VListItem
						class="d-flex-inline flex-grow-1"
						density="compact"
					>
						<h3 class="fill-height d-flex-inline align-center justify-center">{{ $t('notification.title') }}</h3>
						<VListItemSubtitle class="fill-height d-flex-inline" v-if="!notifications.length">{{ $t('notification.empty') }}</VListItemSubtitle>
						<VSpacer />
						<template v-slot:append="{  }">
							<VListItemAction start>
								<IconButton
										:disabled="busy"
										icon="mdi-check"
										:text="$t('notification.read_all')"
										@click.stop="bulkMarkAsRead"
										v-if="hasUnreadNotif"
								/>
								<IconButton
										:disabled="busy"
										icon="mdi-delete"
										:text="$t('notification.delete_all')"
										@click.stop="bulkDestroy"
										v-if="hasReadNotif"
								/>
							</VListItemAction>
						</template>
					</VListItem>
				</VList>
			</VCardTitle>
			<VCardActions class="d-flex flex-grow-1" v-if="notificationCount">
				<VList 
					class="d-flex flex-grow-1 flex-column"
					v-model:selected="selected"
					select-strategy="leaf"
					lines="three"
					show-select
					density="compact"
				>
					<VListItem
						class="d-flex-inline flex-grow-1"
						density="compact"
						v-for="(notif, i) in notifications"
						:key="i"
						:value="notif.id"
						@click.stop.prevent="router.visit(notif.data.url ?? '#')"
					>
						<template v-slot:prepend="{ isSelected, select }">
							<VListItemAction start v-if="false">
								<VCheckboxBtn
								:model-value="isSelected"
								@click.stop=""
								@update:model-value="select" />
							</VListItemAction>
						</template>
						<VListItemSubtitle>{{ notif.data.title ?? '' }}</VListItemSubtitle>
						<VListItemTitle>{{ notif.data.message ?? '' }}</VListItemTitle>
						<template v-slot:append="{  }">
							<VListItemAction start>
								<IconButton
										:disabled="busy"
										icon="mdi-check"
										:text="$t('notification.read')"
										@click.stop.prevent="() => markAsRead(notif)"
										v-if="!notif.read_at"
								/>
								<IconButton
										:disabled="busy"
										icon="mdi-delete"
										:text="$t('form.delete')"
										@click.stop.prevent="() => destroy(notif)"
										v-if="notif.read_at"
								/>
							</VListItemAction>
						</template>
					</VListItem>
				</VList>
			</VCardActions>
		</VCard>
	</VMenu>
</template>
<style scoped>
</style>