#include <iostream>

int main()
{
    int x{};
    std::cout << "x? ";
    std::cin >> x;

    if (x == 0) ;
        std::cout << "Z\n";
    else
        std::cout << "NZ\n";

    return 0;
}
