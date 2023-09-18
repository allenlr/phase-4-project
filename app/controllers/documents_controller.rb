class DocumentsController < ApplicationController
    before_action :authorize

    def show
        document = Document.find(params[:id])
        render sjon: document
    end

    def index
        documents = Document.all
        render json: documents
    end

    def create
        document = Document.create(authorize_id: session[:user_id])
        render json: document, status: :created
    end

    private

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
