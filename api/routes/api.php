<?php

use App\Http\Controllers\Api\AgenteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CustomUserController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\Api\PersonaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Registro e inicio de sesion
Route::post('register', [CustomUserController::class,'register']);
Route::post('login', [CustomUserController::class, 'login']);

//Para obtener al usuario
Route::get('getUser', [RegisterController::class, 'getUsuario']);
// Route::post('registrarPersona', [RegisterController::class,'registrarPersona']);

//Para obtener los datos de la persona
Route::get('getPersona', [PersonaController::class, 'getPersona']);

// Para poder publicar los inmuebles
Route::post('postInmueble', [AgenteController::class, 'PublicarInmueble']);

Route::group(['middleware' => 'api',], function () {
    Route::post('logout', [CustomUserController::class, 'logout']);
    Route::post('refresh', [CustomUserController::class, 'refresh']);
    Route::post('me', [CustomUserController::class, 'me']);

    
});