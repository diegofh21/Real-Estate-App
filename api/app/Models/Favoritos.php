<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favoritos extends Model
{
    use HasFactory;

    protected $table = 'favoritos';

    protected $fillable = [
        'id_propiedad',
        'id_cliente'
    ];

    public function propiedad() {
        return $this->hasMany(Propiedades::class);
    }

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }
}
