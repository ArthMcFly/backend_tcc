#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
	int main(){
		char choice;
		int figure;
		float result, l1, l2, l3, l4, r;
		const float PI = 3.14;
		//Leitura do calculo 
		printf("Qual calculo você deseja fazer: \n (A)rea ou (P)erímetro?\n");
		scanf("%c",&choice);

		//Detecção do calculo 
		if(choice == 'A' || choice == 'a'){
			system("clear");
			//Seleção da figura
			printf("Qual é a figura geométrica:\n [1]Triângulo\n [2]Quadrilátero\n [3]Trapézio\n [4]Circulo\n");
			scanf("%d",&figure);
			
			switch(figure){
					//Seleção da fórmula
					case 1:
						system("clear");
						printf("Digite a base:\n");
						scanf("%f",&l1);
						printf("Digite a altura:\n");
						scanf("%f",&l2);
						result = (l1 * l2)/2;
						system("clear");
						printf("O resultado é: %.2f\n", result);
					break;
					case 2:
						system("clear");
						printf("Digite a base:\n");
						scanf("%f",&l1);
						printf("Digite a altura:\n");
						scanf("%f",&l2);
						result = l1 * l2;
						system("clear");
						printf("O resultado é: %.2f\n", result);

					break;
					case 3:
						system("clear");
						printf("Digite a base maior:\n");
						scanf("%f",&l1);
						printf("Digite a base menor:\n");
						scanf("%f",&l2);
						printf("Digite a altura:\n");
						scanf("%f",&l3);
						result = ((l1 + l2) * l3)/2;
						system("clear");
						printf("O resultado é: %.2f\n", result);

					break;
					case 4:
						system("clear");
						printf("Digite o raio:\n");
						scanf("%f",&r);
						result = PI * pow(r,2);
						system("clear");
						printf("O resultado é: %.2f\n", result);

					break;
					default:
						system("clear");
						printf("Parâmetro inválido\n");
				}
		}else if(choice == 'P' || choice == 'p'){
						system("clear");
						printf("Qual é a figura geométrica:\n [1]Triângulo\n [2]Quadrilátero\n [3]Trapézio\n [4]Circulo\n");
						scanf("%d",&figure);
				switch(figure){
					//seleção da fórmula
					case 1:
						system("clear");
						printf("Digite o primeiro lado:\n");
						scanf("%f",&l1);
						printf("Digite o segundo lado:\n");
						scanf("%f",&l2);
						printf("Digite o terceiro lado:\n");
						scanf("%f",&l3);
						result = l1 + l2 + l3;
						system("clea/r");
						printf("O resultado é: %.2f\n", result);

					break;
					case 2:
						system("clear");
						printf("Digite o primeiro lado:\n");
						scanf("%f",&l1);
						printf("Digite o segundo lado:\n");
						scanf("%f",&l2);
						printf("Digite o terceiro lado:\n");
						scanf("%f",&l3);
						printf("Digite o quarto lado:\n");
						scanf("%f",&l4);
						result = l1 + l2 + l3 + l4;
						system("clear");
						printf("O resultado é: %.2f\n", result);
					break;
					case 3:
						system("clear");
						printf("Digite o primeiro lado:\n");
						scanf("%f",&l1);
						printf("Digite o segundo lado:\n");
						scanf("%f",&l2);
						printf("Digite o terceiro lado:\n");	
						scanf("%f",&l3);
						printf("Digite o quarto lado:\n");
						scanf("%f",&l4);
						result = l1 + l2 + l3 + l4;
						system("clear");
						printf("O resultado é: %.2f\n", result);
					break;
					case 4:
						system("clear");
						printf("Digite o raio:\n");
						scanf("%f",&r);
						result = 2 * PI * r;
						system("clear");
						printf("O resultado é: %.2f\n", result);
					break;
					default:
						system("clear");
						printf("Parâmetro inválido\n");
				}
			}else if(choice != 'A' || choice != 'a' || choice != 'P' || choice != 'p'){
						system("clear");
						printf("Parâmetro inválido\n");
				}
		return 0;
	}
