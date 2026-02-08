#include <cstdint>
#include <iostream>

int main()
{
    std::int32_t s{ -1 };
    std::uint32_t u{ 1 };

    if (s < u)
        std::cout << "L\n";
    else
        std::cout << "R\n";

    return 0;
}
