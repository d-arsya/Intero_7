<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', 'api/docs');
Route::redirect('/api', 'api/docs');
