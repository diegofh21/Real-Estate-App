<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('propiedad', function (Blueprint $table) {
            $table->integer('id_propiedad', 11);
            $table->string('titulo');
            $table->string('ubicacion');
            $table->text('descripcion');
            $table->double('precio', 18, 2);
            $table->string('tipo');
            $table->string('bathroom');
            $table->string('habitaciones');
            $table->string('estacionamientos');
            $table->string('estado');
            $table->timestamps();
        });
    }

//     propiedad` int(11) NOT NULL,
//   `titulo` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
//   `ubicacion` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
//   `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL,
//   `precio` float NOT NULL,
//   `tipo` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
//   `estado` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
//   `id_agente` int(11) DEFAULT NULL

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('propiedad');
    }
};
