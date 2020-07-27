class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories.as_json(
      only: [:id, :name],
      include: {
        settings: {
          only: [:name, :id]
        }
      }
    )
  end
end
