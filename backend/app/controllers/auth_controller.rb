require 'jwt'
class AuthController < ApplicationController
    SECRET_KEY = Rails.application.credentials[:jwt_secret]


    def register
        user= User.new(user_params)
        if user.save
            token = encode_token(user.id)
            render json: {user: user, token: token}, status: :created
        else
            render json: {message: 'Failed to Register'}, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            token = encode_token(user.id)
            render json: {user: user, token: token}
        else
            render json: {message: 'Failed to login'}, status: :unauthorized
        end
    end


    private

    def encode_token(user_id)
        JWT.encode({user_id: user_id}, SECRET_KEY, 'HS256')
    end

    def user_params
        params.permit(:name, :email, :password, :password_confirmation)
    end
    
end
