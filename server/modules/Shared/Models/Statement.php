<?php

namespace Shared\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Shared\Models\User;

class Statement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'verified_by_user_id',
        'description',
        'value',
        'type',
        'status',
        'reject_reason',
        'file_path',
        'accepted_at',
    ];

    protected $appends = [
        'file_url'
    ];

    public static function boot() {
       
        parent::boot();
       
        static::creating(function($statement) {
            $statement->status = $statement->type === 'purchase' ? 'approved' : 'pending';
        });

    }

    /**
     * Get the file_+url.
     */
    protected function fileUrl(): Attribute
    {
        return Attribute::make(
            get: function($value, $attributes) {
                

                if (is_null($attributes['file_path']) || strstr($attributes['file_path'], 'http')) {
                    return $attributes['file_path'];
                }

                $url = Storage::temporaryUrl(
                    $attributes['file_path'], now()->addMinutes(5)
                );

                return $url;
            },
        );
    }


    /**
     * Relationships
     */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function verified_by_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by_user_id');
    }

}
