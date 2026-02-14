#include <iostream>

int main()
{
    char c{ 97 };

    std::cout << c << '\n';
    std::cout << static_cast<int>(c) << '\n';

    return 0;
}
