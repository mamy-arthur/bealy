import { IsNotEmpty, IsNumber } from "class-validator";

export class UserFavoritesDto {
    @IsNotEmpty()
    @IsNumber()
    favoriteId!: number;
}