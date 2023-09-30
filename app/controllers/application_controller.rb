class ApplicationController < ActionController::API
  require 'jwt'
  include ActionController::Cookies
  wrap_parameters false
  before_action :authorized
  
  rescue_from CustomError do |exception|
    render json: { error: exception.message }, status: :unauthorized
  end

  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  

  def encode_token(payload)
    expiration = 24.hours.from_now.to_i
    JWT.encode(payload.merge(exp: expiration), Rails.application.credentials.jwt_secret)
  end

  def decoded_token
    if authorization_header
      token = authorization_header.split(' ')[1]
      begin
        JWT.decode(token, Rails.application.credentials.jwt_secret, true, algorithm: 'HS256')
      rescue JWT::ExpiredSignature
        raise CustomError.new("User token expired. Please log in again.")
      rescue JWT::DecodeError
        raise CustomError.new("Token is invalid, Authorization failed.")
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
    @user
  end

  def logged_in?
    !!current_user
  end


  def authorized
    raise CustomError.new("Not Authorized") unless logged_in?
  end

  private

  def authorization_header
    request.headers['Authorization']
  end

end
