<?php

namespace Shared\Policies;

use Shared\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->isAdministrator()
            ? Response::allow()
            : Response::deny('You do not have permission to view this user.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): Response
    {
        return $user->isAdministrator() || $user->id === $model->id
            ? Response::allow()
            : Response::deny('You do not have permission to view this user.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): Response
    {
        return $user->isAdministrator() || $user->id === $model->id
            ? Response::allow()
            : Response::deny('You do not have permission to update this user.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): Response
    {
        return $user->isAdministrator() || $user->id === $model->id
            ? Response::allow()
            : Response::deny('You do not have permission to delete this user.');
    }

}
