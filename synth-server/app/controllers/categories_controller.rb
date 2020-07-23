class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories.as_json(
      only: [:name],
      include: {
        settings: {
          only: [:name, :id]
        }
      }
    )
  end
end
