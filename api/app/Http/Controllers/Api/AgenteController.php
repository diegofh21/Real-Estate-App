<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Propiedades;

class AgenteController extends BaseController
{
    public function PublicarInmueble(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Required for posting properties
            'titulo' => 'required|max:191',
            'ubicacion' => 'required|max:191',
            'descripcion' => 'required',
            'precio' => 'required',
            'tipo' => 'required|max:191',
            'bathroom' => 'required|max:191',
            'habitaciones' => 'required|max:191',
            'estacionamientos' => 'required|max:191',
            'estado' => 'required|max:191',
            'id_agente' => 'required',
            'photo' => 'required|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        else {
            $inmueble = new Propiedades();

            $inmueble->titulo = $request->titulo;
            $inmueble->ubicacion = $request->ubicacion;
            $inmueble->descripcion = $request->descripcion;
            $inmueble->precio = $request->precio;
            $inmueble->tipo = $request->tipo;
            $inmueble->titbathroomulo = $request->bathroom;
            $inmueble->habitaciones = $request->habitaciones;
            $inmueble->estacionamientos = $request->estacionamientos;
            $inmueble->estado = $request->estado;
            $inmueble->id_agente = $request->id_agente;
            $inmueble->photo = $request->photo;
        }

        $imageName = time().'.'.$request->photo->extension();

        //Store in Storage Folder
        $request->image->storeAs('public', $imageName);

        // $request->validate([
        //     'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
        // ]);

        return response()->json($inmueble);
    }
}
