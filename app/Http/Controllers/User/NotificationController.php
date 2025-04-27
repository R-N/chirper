<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utils\ResponseUtil;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()->notifications; // Get all notifications for the logged-in user
        return response()->json([
            'items' => $notifications
        ]);
    }
    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->find($id);
        if ($notification) {
            $notification->markAsRead();
        }
        return response()->json(['message' => __('notification.marked_read')]);
    }
    public function bulkMarkAsRead(Request $request)
    {
        $notifs = $request->user()->unreadNotifications;
        $ids = $request->input('ids', null);
        if ($ids){
            $notifs = $notifs->whereIn('id', $ids);
        }
        $notifs->markAsRead();
        return response()->json(['message' =>  __('notification.marked_read')]);
    }
    public function destroy(Request $request, $id)
    {
        $notification = $request->user()->notifications()->find($id);
        if ($notification) {
            $notification->delete();
        }
        return response()->json(['message' => __('notification.deleted')]);
    }
    public function bulkDestroy(Request $request)
    {
        $notifs = $request->user()->readNotifications();
        $ids = $request->input('ids', null);
        if ($ids){
            $notifs = $notifs->whereIn('id', $ids);
        }
        $notifs->delete();
        return response()->json(['message' => __('notification.bulk_deleted')]);
    }


}

