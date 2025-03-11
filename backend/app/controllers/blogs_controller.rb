require 'jwt'

class BlogsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]

  def index
    @blogs = Blog.all
    render json: @blogs
  end

  def show
    blog = Blog.find(params[:id])
    render json: blog
  end
  

  def create
    blog = @current_user.blogs.build(blog_params)
    if blog.save
      render json: blog, status: :created
    else
      render json: { error: "Failed to create blog" }, status: :unprocessable_entity
    end
  end

  def update
    blog = @current_user.blogs.find(params[:id])
    if blog.update(blog_params)
      render json: blog
    else
      render json: { error: "Failed to update blog" }, status: :unprocessable_entity
    end
  end

  def destroy
    blog = @current_user.blogs.find(params[:id])
    blog.destroy
    render json: { message: "Blog deleted" }
  end

  private

  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
  
    Rails.logger.info "🔍 Incoming Token: #{token}"
  
    if token.nil?
      Rails.logger.error "❌ Token missing in request headers"
      return render json: { error: "Token missing" }, status: :unauthorized
    end
  
    begin
      secret_key = Rails.application.credentials.jwt_secret || ENV['JWT_SECRET']
      Rails.logger.info "🔑 Secret Key Used: #{secret_key}"
  
      decoded = JWT.decode(token, secret_key, true, algorithm: "HS256")[0]
      Rails.logger.info "✅ Decoded Token: #{decoded}"
  
      @current_user = User.find(decoded["user_id"])
      Rails.logger.info "👤 Current User: #{@current_user.inspect}"
    rescue JWT::DecodeError => e
      Rails.logger.error "❌ JWT Decode Error: #{e.message}"
      render json: { error: "Unauthorized" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound
      Rails.logger.error "❌ User not found for token"
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
    
  
  def blog_params
    params.require(:blog).permit(:title, :description)
  end
end
