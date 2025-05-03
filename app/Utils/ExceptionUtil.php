<?php

namespace App\Utils;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class ExceptionUtil
{
    public static function toArray($e, $maxStack = 5)
    {
        $data = [
            'exception' => get_class($e),
        ];
        if (method_exists($e, 'getErrorMessage')) {
            $data['message'] = $e->getErrorMessage();
        } else {
            $data['message'] = $e->getMessage();
        }
        if (method_exists($e, 'getErrorCode')) {
            $data['code'] = $e->getErrorCode();
        } else {
            $data['code'] = $e->getCode();
        }
        if (method_exists($e, 'shouldShow')) {
            $data['show'] = $e->shouldShow();
        } elseif (property_exists($e, 'show')) {
            $data['show'] = $e->show;
        } elseif (self::shouldShow($e)) {
            $data['show'] = true;
        }
        if (property_exists($e, 'trace') && $e->trace) {
            $data['file'] = $e->getFile();
            $data['line'] = $e->getLine();
            if (is_int($e->trace)) {
                $maxStack = $e->trace;
            }
            $data['trace'] = collect($e->getTrace())->take($maxStack);
        }
        // if (property_exists($e, 'redirect') && $e->redirect) {
        //   $data['redirect'] = $e->redirect;
        // }
        if (method_exists($e, 'getStatus')) {
            $data['status'] = $e->getStatus();
        } elseif (property_exists($e, 'status') && $e->status) {
            $data['status'] = $e->status;
        }
        if (method_exists($e, 'getTitle')) {
            $data['title'] = $e->getTitle();
        } elseif (property_exists($e, 'title') && $e->title) {
            $data['title'] = $e->title;
        }

        if (method_exists($e, 'errors')) {
            $data['errors'] = $e->errors();
        }
        if (method_exists($e, 'getModel')) {
            $data['model'] = $e->getModel();
        }
        if (method_exists($e, 'guards')) {
            $data['guards'] = $e->guards();
        }

        return $data;
    }

    public static function getStatusCode($e)
    {
        if (method_exists($e, 'getStatusCode')) {
            return $e->getStatusCode();
        }
        if ($e instanceof ValidationException) {
            return 400;
        }
        if ($e instanceof AuthenticationException) {
            return 401;
        }
        if ($e instanceof AuthorizationException) {
            return 403;
        }
        if ($e instanceof ModelNotFoundException) {
            return 404;
        }
        if ($e instanceof NotFoundHttpException) {
            return 404;
        }
        if ($e instanceof MethodNotAllowedException) {
            return 405;
        }
        if ($e instanceof MethodNotAllowedHttpException) {
            return 405;
        }
        if ($e instanceof ThrottleRequestsException) {
            return 429;
        }

        return 500;
    }

    public static function shouldShow($e)
    {
        if (
            $e instanceof ValidationException
            || $e instanceof AuthenticationException
            || $e instanceof AuthorizationException
            || $e instanceof ThrottleRequestsException
            || $e instanceof HttpException
        ) {
            $e->show = true;

            return true;
        }

        return false;
    }
}
