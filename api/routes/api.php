<?php

use App\Http\Controllers\Api\AgenteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CustomUserController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\Api\PersonaController;
use App\Http\Controllers\Api\ClienteController;

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
Route::post('registrarPersona', [RegisterController::class,'registrarPersona']);

//Para obtener los datos de la persona
Route::get('getPersona', [PersonaController::class, 'getPersona']);
Route::put('editPersona', [PersonaController::class, 'editPersona']); // editar persona

//Ruta para hacer el favorito del inmueble
Route::post('makeFavoritos', [ClienteController::class, 'makeFavoritos']);
Route::get('cuentaFavoritos', [ClienteController::class, 'cuentaFavoritos']);
Route::get('propiedadesFavoritos', [ClienteController::class, 'propiedadesFavoritos']);

//Obtener los inmuebles publicados para el dashboard del agente
Route::get('getAllInmuebles', [AgenteController::class, 'getAllInmuebles']); //Obtener todos los inmuebles publicados
Route::get('getInmueblesPublicados', [AgenteController::class, 'getInmueblesPublicados']);
Route::get('busquedaInmuebles', [AgenteController::class, 'busquedaInmuebles']);

// Para poder publicar los inmuebles
Route::post('postInmueble', [AgenteController::class, 'PublicarInmueble']);
Route::post('postImg', [AgenteController::class, 'postImg']); //Publicar imagen del inmueble
Route::put('updateInmueble', [AgenteController::class, 'updateInmueble']); //Actualizar inmuebles
Route::delete('deleteInmueble', [AgenteController::class, 'deleteInmueble']); //Actualizar inmuebles

Route::group(['middleware' => 'api',], function () {
    Route::post('logout', [CustomUserController::class, 'logout']);
    Route::post('refresh', [CustomUserController::class, 'refresh']);
    Route::post('me', [CustomUserController::class, 'me']);

    
});