<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('numero')->nullable()->after('id');
            // Soft delete (recommandé pour pouvoir réutiliser les numéros)
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('numero');
            $table->dropSoftDeletes();
        });
    }
};