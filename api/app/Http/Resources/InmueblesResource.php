<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InmueblesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id_propiedad' => $this->id_propiedad,
            'titulo' => $this->titulo,
            'ubicacion' => $this->ubicacion,
            'descripcion' => $this->descripcion,
            'precio' => $this->precio,
            'tipo' => $this->tipo,
            'bathroom' => $this->bathroom,
            'habitaciones' => $this->habitaciones,
            'estacionamientos' => $this->estacionamientos,
            'estado' => $this->estado,
            'photo' => $this->photo,
            'id_agente' => $this->id_agente,
        ];
    }
}
