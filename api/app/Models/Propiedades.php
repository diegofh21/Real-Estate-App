<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Propiedades extends Model
{
    use HasFactory;

    protected $table = 'propiedad';

    protected $fillable = [
        'titulo',
        'ubicacion',
        'descripcion',
        'precio',
        'tipo',
        'bathroom',
        'habitaciones',
        'estacionamientos',
        'estado',
        'photo',
        'id_agente',
    ];

    public function agente() {
        return $this->hasOne(Agente::class);
    }

    public function favoritos() {
        return $this->belongsToMany(Favoritos::class);
    }
}
